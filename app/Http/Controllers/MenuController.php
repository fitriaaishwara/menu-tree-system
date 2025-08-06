<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use App\Services\MenuService;
use Inertia\Inertia;
use Illuminate\Support\Str;

class MenuController extends Controller
{
    public function __construct(protected MenuService $menuService) {}

    // public function index()
    // {
    //     $menus = Menu::whereNull('parent_id')
    //         ->with('children') // ini udah rekursif karena di modelnya tadi
    //         ->orderBy('name')
    //         ->get();

    //     return Inertia::render('Menus/Index', [
    //         'menus' => $menus
    //     ]);
    // }

    public function index()
    {
        // Mengambil menu yang parent_id-nya null, dengan children, diurutkan berdasarkan created_at (ascending)
        $menus = Menu::whereNull('parent_id')
                    ->with(['children' => function($query) {
                        $query->orderBy('created_at', 'ASC');  // Urutkan submenu berdasarkan created_at (ascending)
                    }])
                    ->orderBy('created_at', 'ASC')  // Urutkan menu utama berdasarkan created_at (ascending)
                    ->get();

        return Inertia::render('Menus/Index', [
            'menus' => $menus,
        ]);
    }




    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|uuid|exists:menus,id',
        ]);

        $depth = 0;

        if ($validated['parent_id']) {
            $parent = Menu::find($validated['parent_id']);
            $depth = $parent ? $parent->depth + 1 : 1;
        }

        $menu = Menu::create([
            'id' => Str::uuid(),
            'name' => $validated['name'],
            'parent_id' => $validated['parent_id'] ?? null,
            'depth' => $depth,
        ]);

        return redirect()->back()->with('success', 'Menu berhasil ditambahkan');
    }

    public function edit($id)
    {
        // Mengambil menu beserta parent data
        $menu = Menu::with('parent') // pastikan relasi parent terdefinisi
            ->findOrFail($id); // Mengambil menu berdasarkan ID

        return Inertia::render('Menus/Index', [
            'menu' => $menu,
        ]);
    }





    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|uuid|exists:menus,id',
        ]);

        $menu = Menu::findOrFail($id);

        $menu->update([
            'name' => $validated['name'],
            'parent_id' => $validated['parent_id'] ?? null,
            'depth' => $validated['parent_id']
                ? Menu::find($validated['parent_id'])->depth + 1
                : 0,
        ]);

        return redirect()->back()->with('success', 'Menu berhasil diperbarui');
    }

public function destroy($id)
{
    $menu = Menu::findOrFail($id);
    $menu->delete();

    return redirect()->back()->with('success', 'Menu berhasil dihapus');
}

}

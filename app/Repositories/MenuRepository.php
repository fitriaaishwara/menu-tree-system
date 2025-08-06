<?php

namespace App\Repositories;

use App\Models\Menu;
use App\Repositories\Interfaces\MenuRepositoryInterface;

class MenuRepository implements MenuRepositoryInterface
{
    public function getAll()
    {
        return Menu::with('children')->whereNull('parent_id')->orderBy('order')->get();
    }

    public function findById(string $id): ?Menu
    {
        return Menu::find($id);
    }

    public function create(array $data): Menu
    {
        return Menu::create($data);
    }

    public function update(string $id, array $data): Menu
    {
        $menu = $this->findById($id);
        $menu->update($data);
        return $menu;
    }

    public function delete(string $id): bool
    {
        $menu = $this->findById($id);
        return $menu->delete();
    }
}

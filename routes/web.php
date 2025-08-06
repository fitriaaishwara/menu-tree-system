<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use Inertia\Inertia;

// Route '/' diarahkan langsung ke halaman menus
Route::redirect('/', '/menus');

// Route untuk menu tree
Route::get('/menus', [MenuController::class, 'index'])->name('menus.index');
Route::post('/menus', [MenuController::class, 'store'])->name('menus.store');
Route::put('/menus/{id}', [MenuController::class, 'update'])->name('menus.update');
Route::delete('/menus/{id}', [MenuController::class, 'destroy'])->name('menus.destroy');

// routes/web.php
Route::get('/api/menus', [MenuController::class, 'apiIndex'])->name('menus.api.index');
Route::get('/api/menus/{id}', [MenuController::class, 'apiShow'])->name('menus.api.show');





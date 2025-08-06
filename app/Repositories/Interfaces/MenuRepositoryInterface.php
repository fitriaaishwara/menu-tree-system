<?php

namespace App\Repositories\Interfaces;

use App\Models\Menu;

interface MenuRepositoryInterface
{
    public function getAll();
    public function findById(string $id): ?Menu;
    public function create(array $data): Menu;
    public function update(string $id, array $data): Menu;
    public function delete(string $id): bool;
}

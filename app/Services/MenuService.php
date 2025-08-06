<?php

namespace App\Services;

use App\Models\Menu;
use App\Repositories\Interfaces\MenuRepositoryInterface;
use Illuminate\Support\Collection;

class MenuService
{
    public function __construct(
        protected MenuRepositoryInterface $menuRepository
    ) {}

    /** @return Collection<Menu> */
    public function getAll(): Collection
    {
        return $this->menuRepository->getAll();
    }

    public function findById(string $id): Menu
    {
        return $this->menuRepository->findById($id);
    }

    public function create(array $data): Menu
    {
        $data['depth'] = $this->calculateDepth($data['parent_id'] ?? null);
        return $this->menuRepository->create($data);
    }

    public function update(string $id, array $data): Menu
    {
        $data['depth'] = $this->calculateDepth($data['parent_id'] ?? null);
        return $this->menuRepository->update($id, $data);
    }

    public function delete(string $id): bool
    {
        return $this->menuRepository->delete($id);
    }

    private function calculateDepth(?string $parentId): int
    {
        if (!$parentId) return 1;

        $parent = $this->menuRepository->findById($parentId);
        return $parent ? $parent->depth + 1 : 1;
    }
}

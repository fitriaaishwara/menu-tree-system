# Menu Tree System (Laravel 11 + React + Inertia.js)

A dynamic Menu Tree System built with Laravel 11 (using Service & Repository pattern), React (with Inertia.js), Tailwind CSS, and PostgreSQL/MySQL.  
Supports multi-depth nested menus with Create, Update, and Delete functionality.

---

## 🚀 Features
- Recursive Menu Tree View
- Add Submenu & Parent Menu
- Edit Menu
- Delete Menu
- UUID for Menu IDs
- Service & Repository Pattern in Laravel

---

## ⚙️ Tech Stack
- **Backend:** Laravel 11, PHP 8.x
- **Frontend:** React.js, Inertia.js, Tailwind CSS
- **Database:** MySQL / PostgreSQL

---

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/username/menu-tree-system.git
cd menu-tree-system

# Install PHP dependencies
composer install

# Install JS dependencies
npm install && npm run dev

# Setup .env
cp .env.example .env
php artisan key:generate

# Setup database
php artisan migrate

# (Optional) Seed data
php artisan db:seed

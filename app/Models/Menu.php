<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Menu extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id',  'name', 'url', 'parent_id', 'depth', 'order'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')->with('children');
    }



    public function childrenRecursive()
    {
        return $this->hasMany(Menu::class, 'parent_id')->with('childrenRecursive');
    }



    public function parent(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }
}

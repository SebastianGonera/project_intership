<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class AcquisitionChannel extends Model
{
    /**
     * @use HasFactory for create factory to fill table.
     */
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'amount'
    ];
}

<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/booking',[BookingController::class,'index'])->name('booking.index');
Route::get('/booking/pie',[BookingController::class,'pie'])->name('booking.pie');
Route::get('/booking/create',[BookingController::class,'create'])->name('booking.create');
Route::post('/booking',[BookingController::class,'store'])->name('booking.store');
Route::get('/booking/{booking}/edit', [BookingController::class, 'edit'])->name('booking.edit');
Route::put('/booking/{booking}', [BookingController::class, 'update'])->name('booking.update');
Route::delete('/booking/{booking}', [BookingController::class, 'destroy'])->name('booking.destroy');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/employees',[EmployeesController::class,'index'])->name('employees.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //Route::get('/employees',[EmployeesController::class,'index'])->name('employees.index');
});

require __DIR__.'/auth.php';

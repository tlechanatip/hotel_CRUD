<?php

namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;


class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $query = $request->input('search');
    $sortBy = $request->input('sort_by', 'emp_no'); // ค่าเริ่มต้นเป็น emp_no
    $order = $request->input('order', 'asc'); // ค่าเริ่มต้นเป็น asc (น้อยไปมาก)

    $employees = DB::table('employees')
        ->select(
            'emp_no',
            'first_name',
            'last_name',
            'gender',
            'birth_date',
            DB::raw('TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age') // คำนวณอายุจากวันเกิด
        )
        ->where(function ($queryBuilder) use ($query) {
            $queryBuilder->where('first_name', 'like', '%' . $query . '%')
                         ->orWhere('last_name', 'like', '%' . $query . '%')
                         ->orWhere('emp_no' , $query);
        })
        ->orderBy($sortBy, $order) // เพิ่มคำสั่งจัดเรียง
        ->paginate(10);

    return Inertia::render('Employees/index', [
        'employees' => $employees,
        'query' => $query,
        'sort_by' => $sortBy,
        'order' => $order
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employees $employees)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employees $employees)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employees $employees)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employees $employees)
    {
        //
    }
}

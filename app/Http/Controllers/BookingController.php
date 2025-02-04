<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomType;
use App\Models\Customer;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class BookingController extends Controller
{

    public function pie()
    {
        $data = Booking::join('rooms', 'rooms.id', '=', 'bookings.room_id')
    ->select('rooms.room_number', DB::raw('COUNT(*) as booking_count'))
    ->groupBy('bookings.room_id', 'rooms.room_number')
    ->orderByDesc('booking_count')
    ->take(5)
    ->get();

        //return response()->json($data);
        return Inertia::render('Hotel/pie', [
            'data' => $data,
        ]);
    }


    public function index(Request $request)
    {

        $query = $request->input('search');
        $sortBy = $request->input('sort_by', 'id'); // ค่าเริ่มต้นเป็น emp_no
        $order = $request->input('order', 'asc'); // ค่าเริ่มต้นเป็น asc (น้อยไปมาก)


        $booking = Booking::orderBy($sortBy, $order);

        if (!empty($query)) {
            $booking = $booking->where(function ($queryBuilder) use ($query) {
                $queryBuilder->orWhere('customer_id', $query)
                     ->orWhere('id', $query);
        });
        }

        $booking = $booking->paginate(10);



        return Inertia::render('Hotel/index', [
            'booking' => $booking,
            'sort_by' => $sortBy,
            'order' => $order,
            'query' => $query,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //ดึงรายชื่อแผนกจากฐานข้อมูล เพื่อไปแสดงให้เลือกรายการในแบบฟอร์ม
        $roomtype = DB::table('room_types')->select('id', 'type_name')->get();

        //ส่งข้อมูลไปยังหน้า Inertia
        return Inertia::render('Hotel/create', ['roomtype' => $roomtype]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        log::info($request->all());

        $validated = $request->validate([
            'customer_id' => 'required',
            'room_id' => 'required',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date',
            'total_price' => 'required',
        ]);

        try {
        // ใช้ Transaction เพื่อความปลอดภัย
        DB::transaction(function () use ($validated, $request) {
            // 1. หาค่า emp_no ล่าสุด
            $latestid = DB::table('bookings')->max('id') ?? 0; // ถ้าไม่มีข้อมูลให้เป็น 0
            $newid = $latestid + 1; // ค่าล่าสุด + 1

            // 2. เพิ่มข้อมูลลงในตาราง employees
            DB::table('bookings')->insert([
                'id' => $newid,
                'customer_id' => $validated['customer_id'],
                'room_id' => $validated['room_id'],
                'check_in_date' => $validated['check_in_date'],
                'check_out_date' => $validated['check_out_date'],
                'total_price' => $validated['total_price'],
                'created_at' => now(),
            ]);

        });

        // ส่ง Flash Message เมื่อสำเร็จ
        return redirect()->route('booking.index')
                        ->with('success', 'created successfully.');
    } catch (\Exception $e) {
        // เขียน Log ข้อผิดพลาด
        Log::error('creation failed: ' . $e->getMessage());
        // ส่ง Flash Message เมื่อเกิดข้อผิดพลาด
        return redirect()
            ->route('booking.create')
            ->with('error', 'creation failed. Please try again.');
    }
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        return Inertia::render('Hotel/edit', [
            'booking' => $booking,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'customer_id' => 'required',
            'room_id' => 'required',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date',
            'total_price' => 'required',
        ]);

        try {
        // ใช้ Transaction เพื่อความปลอดภัย
        DB::transaction(function () use ($validated, $request, $booking) {
            $booking->update($request->all());

        });

        return redirect()->route('booking.index')
                        ->with('success', 'created successfully.');
        } catch (\Exception $e) {
        // เขียน Log ข้อผิดพลาด
        Log::error('creation failed: ' . $e->getMessage());
        Log::error('Trace: ' . $e->getTraceAsString());
        return redirect()
            ->route('booking.index')
            ->with('error', 'creation failed. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        try {
                $booking->delete();


            return redirect()->route('booking.index')
            ->with('success', 'created successfully.');
        } catch (\Exception $e) {
        // เขียน Log ข้อผิดพลาด
        Log::error('creation failed: ' . $e->getMessage());
        return redirect()
            ->route('booking.edit')
            ->with('error', 'creation failed. Please try again.');
        }
    }
}

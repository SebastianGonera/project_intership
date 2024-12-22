<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcquisitionChannelRequest;
use App\Models\AcquisitionChannel;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;

class AcquisitionChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try{
            $channels = AcquisitionChannel::all(['name', 'amount']);

            return response()->json($channels);
        }
        catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AcquisitionChannelRequest $request): JsonResponse
    {
        try{
            $newChannel = AcquisitionChannel::create($request->validated());
            $responseBody = [
                "name" => $newChannel->name,
                "amount" => $newChannel->amount
            ];
            return response()->json([
                'message' => 'Channel updated successfully',
                'channel' => $responseBody,
                ], 200);

        }catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(AcquisitionChannelRequest $request, string $name): JsonResponse
    {
        try{
            $channel = AcquisitionChannel::where('name', $name)->firstOrFail();
            $channel->update($request->validated());
            $responseBody = [
                "name" => $channel->name,
                "amount" => $channel->amount
            ];
            return response()->json([
                'message' => 'Channel updated successfully',
                'channel' => $responseBody,
            ], 201);

        }catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Channel not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $name): JsonResponse
    {
        try {
            $findChannel = AcquisitionChannel::where('name', $name)->firstOrFail();
            $deleted = $findChannel->delete();

            return $deleted
                ? response()->json(['message' => 'Deleted successfully'], 200)
                : response()->json(['message' => 'Failed to delete the channel'], 500);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Channel not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }


    }
}

<?php

namespace Tests\Unit;

use App\Http\Controllers\AcquisitionChannelController;
use App\Http\Requests\AcquisitionChannelRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Tests\TestCase;
use App\Models\AcquisitionChannel;
use Mockery;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AcquisitionChannelControllerTest extends TestCase
{
    use RefreshDatabase;

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testIndexReturnsChannels()
    {
        AcquisitionChannel::factory()->create(['name' => 'Channel 1', 'amount' => 10]);
        AcquisitionChannel::factory()->create(['name' => 'Channel 2', 'amount' => 20]);

        $response = $this->json('GET', '/api/acquisition-channels');
        $response->assertStatus(200);
        $response->assertJsonCount(2);
        $response->assertJsonFragment(['name' => 'Channel 1', 'amount' => 10]);
        $response->assertJsonFragment(['name' => 'Channel 2', 'amount' => 20]);
    }


    public function testIndexHandlesExceptions()
    {
        $mock = Mockery::mock(AcquisitionChannel::class);
        $mock->shouldReceive('all')->andThrow(new \Exception('Database error'));

        $controller = new AcquisitionChannelController();
        $response = $controller->index($mock);

        $this->assertEquals(500, $response->status());
        $this->assertEquals(['message' => 'Database error'], $response->original);
    }

    public function testStoreSuccessfullyAddsChannel()
    {
        $request = Mockery::mock(AcquisitionChannelRequest::class);
        $request->shouldReceive('validated')->andReturn([
            'name' => 'Channel 1',
            'amount' => 100
        ]);

        $mock = Mockery::mock(AcquisitionChannel::class);
        $mock->shouldReceive('create')->with([
            'name' => 'Channel 1',
            'amount' => 100
        ])->andReturn(true);

        $controller = new AcquisitionChannelController();

        $response = $controller->store($request);

        $this->assertEquals(200, $response->status());
        $this->assertEquals(['message' => 'Channel added successfully'], $response->original);
    }

    public function testStoreHandlesExceptions()
    {
        $request = Mockery::mock(AcquisitionChannelRequest::class);
        $request->shouldReceive('validated')->andReturn([
            'amount' => 100
        ]);

        $mock = Mockery::mock(AcquisitionChannel::class);
        $mock->shouldReceive('create')->andThrow(new \Exception('Database error'));

        $controller = new AcquisitionChannelController();

        $response = $controller->store($request);

        $this->assertEquals(500, $response->status());
    }

    public function testUpdateSuccessfullyUpdatesChannel()
    {
        $request = Mockery::mock(AcquisitionChannelRequest::class);
        $request->shouldReceive('validated')->andReturn([
            'amount' => 200
        ]);

        $channel = AcquisitionChannel::factory()->create(['name' => 'Channel 1', 'amount' => 100]);

        $mock = Mockery::mock(AcquisitionChannel::class);
        $mock->shouldReceive('where')->with('name', 'Channel 1')->andReturn($mock);
        $mock->shouldReceive('firstOrFail')->andReturn($channel);
        $mock->shouldReceive('update')->with(['amount' => 200])->andReturn(true);

        $controller = new AcquisitionChannelController();

        $response = $controller->update($request, 'Channel 1');

        $this->assertEquals(201, $response->status());
        $this->assertEquals(['message' => 'Channel updated successfully'], $response->original);
    }

    public function testUpdateHandlesModelNotFoundException()
    {
        $request = Mockery::mock(AcquisitionChannelRequest::class);
        $request->shouldReceive('validated')->andReturn([
            'amount' => 200
        ]);

        $mock = Mockery::mock(AcquisitionChannel::class);
        $mock->shouldReceive('where')->with('name', 'Nonexistent Channel')->andReturn($mock);
        $mock->shouldReceive('firstOrFail')->andThrow(new ModelNotFoundException);

        $controller = new AcquisitionChannelController();

        $response = $controller->update($request, 'Nonexistent Channel');

        $this->assertEquals(404, $response->status());
        $this->assertEquals(['message' => 'Channel not found'], $response->original);
    }

    public function testDestroySuccessfullyDeletesChannel()
    {
        $channel = AcquisitionChannel::factory()->create(['name' => 'Channel 1', 'amount' => 100]);

        $mock = Mockery::mock(AcquisitionChannel::class);
        $mock->shouldReceive('where')->with('name', 'Channel 1')->andReturn($mock);
        $mock->shouldReceive('firstOrFail')->andReturn($channel);
        $mock->shouldReceive('delete')->andReturn(true);

        $controller = new AcquisitionChannelController();

        $response = $controller->destroy('Channel 1');

        $this->assertEquals(200, $response->status());
        $this->assertEquals(['message' => 'Deleted successfully'], $response->original);
    }

    public function testDestroyHandlesModelNotFoundException()
    {
        $mock = Mockery::mock( AcquisitionChannel::class);
        $mock->shouldReceive('where')->with('name', 'Nonexistent Channel')->andReturn($mock);
        $mock->shouldReceive('firstOrFail')->andThrow(new ModelNotFoundException);


        $controller = new AcquisitionChannelController();

        $response = $controller->destroy('Nonexistent Channel');

        $this->assertEquals(404, $response->status());
        $this->assertEquals(['message' => 'Channel not found'], $response->original);
    }

    /**
     * These tests are used to handle errors of a type other than ModelNotFoundException.
     * However, I was unable to simulate an error that would cause an error other than ModelNotFoundException.
     */
//    public function testUpdateHandlesExceptions()
//    {
//        $request = Mockery::mock(AcquisitionChannelRequest::class);
//        $request->shouldReceive('validated')->andReturn([
//            'name' => 'Updated Channel',
//            'amount' => 200
//        ]);
//
//        $mock = Mockery::mock(AcquisitionChannel::class);
//        $mock->shouldReceive('where')->with('name', 'Channel 1')->andReturn($mock);
//        $mock->shouldReceive('firstOrFail')->andThrow(new \Exception('Database error'));
//
//
//        $controller = new AcquisitionChannelController();
//
//        $response = $controller->update($request, 'Channel 1');
//
//        $this->assertEquals(500, $response->status());
//        $this->assertEquals(['message' => 'Database error'], $response->original);
//    }
//
//    public function testDestroyHandlesExceptions()
//    {
//        $mock = Mockery::mock( AcquisitionChannel::class);
//        $mock->shouldReceive('where')->with('name', 'Channel 1')->andReturn($mock);
//        $mock->shouldReceive('firstOrFail')->andThrow(new \Exception('Database error'));
//
//        $controller = new AcquisitionChannelController();
//
//        $response = $controller->destroy('Channel 1');
//
//        $this->assertEquals(500, $response->status());
//        $this->assertEquals(['message' => 'Database error'], $response->original);
//    }

}

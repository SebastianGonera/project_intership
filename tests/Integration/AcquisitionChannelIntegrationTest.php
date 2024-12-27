<?php

namespace Tests\Integration;

use App\Models\AcquisitionChannel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AcquisitionChannelIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function testIndexRetrievesChannelsFromDatabase()
    {
        AcquisitionChannel::factory()->create(['name' => 'Channel 1', 'amount' => 10]);
        AcquisitionChannel::factory()->create(['name' => 'Channel 2', 'amount' => 20]);

        $response = $this->get('/api/acquisition-channels');

        $response->assertStatus(200);
        $response->assertJsonCount(2);
        $response->assertJsonFragment(['name' => 'Channel 1', 'amount' => 10]);
        $response->assertJsonFragment(['name' => 'Channel 2', 'amount' => 20]);
    }

    public function testStoreAddsChannelToDatabase()
    {
        $data = ['name' => 'New Channel', 'amount' => 50];

        $response = $this->post('/api/acquisition-channels', $data);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Channel added successfully']);

        $this->assertDatabaseHas('acquisition_channels', $data);
    }

    public function testUpdateModifiesChannelInDatabase()
    {
        $channel = AcquisitionChannel::factory()->create(['name' => 'Channel 3', 'amount' => 30]);

        $data = ['amount' => 100];

        $response = $this->put('/api/acquisition-channels/' . $channel->name, $data);

        $response->assertStatus(201);
        $response->assertJson(['message' => 'Channel updated successfully']);

        $this->assertDatabaseHas('acquisition_channels', ['name' => $channel->name, 'amount' => 100]);
    }

    public function testDestroyRemovesChannelFromDatabase()
    {
        $channel = AcquisitionChannel::factory()->create(['name' => 'Channel 4', 'amount' => 40]);

        $response = $this->delete('/api/acquisition-channels/' . $channel->name);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Deleted successfully']);

        $this->assertDatabaseMissing('acquisition_channels', ['name' => $channel->name]);
    }
}

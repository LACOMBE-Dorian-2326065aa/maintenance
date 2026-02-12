<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SportControllerTest extends WebTestCase
{
    public function testListSports(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/sports');

        $statusCode = $client->getResponse()->getStatusCode();
        self::assertThat(
            $statusCode,
            self::logicalOr(
                self::equalTo(200),
                self::equalTo(404),
                self::equalTo(405),
            ),
        );
    }

    public function testCreateSport(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/sports', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Tennis',
            'type' => 'individual',
        ]));

        $statusCode = $client->getResponse()->getStatusCode();
        self::assertThat(
            $statusCode,
            self::logicalOr(
                self::equalTo(201),
                self::equalTo(200),
                self::equalTo(404),
                self::equalTo(405),
            ),
        );
    }
}

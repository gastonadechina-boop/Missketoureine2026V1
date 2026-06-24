<?php

namespace Tests\Feature;

use Tests\TestCase;

class SecurityHeadersTest extends TestCase
{
    public function test_security_headers_are_present_on_api_responses(): void
    {
        $response = $this->getJson('/api/test');

        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('X-Frame-Options', 'DENY');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->assertHeader('X-XSS-Protection', '0');
    }

    public function test_content_type_options_header_is_nosniff(): void
    {
        $response = $this->getJson('/api/test');

        $this->assertEquals('nosniff', $response->headers->get('X-Content-Type-Options'));
    }

    public function test_frame_options_header_is_deny(): void
    {
        $response = $this->getJson('/api/test');

        $this->assertEquals('DENY', $response->headers->get('X-Frame-Options'));
    }
}

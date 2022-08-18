<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyUserAuth
{
    public function handle(Request $request, Closure $next)
    {
        if (! Auth('user')->user() || ! Auth('user')->user()->currentAccessToken()) {
            return response()->json('user not found');
        }
        return $next($request);
    }
}

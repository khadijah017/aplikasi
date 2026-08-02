"use client";

import { LoginForm } from "@/components/login-form";

export default function SimpleLoginPage() {
  return <LoginForm />;
}

  // Show success page if logged in
  if (isLoggedIn && currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Login Berhasil!
            </CardTitle>
            <CardDescription>
              Selamat datang di Sistem Perizinan Indonesia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-gray-900">
                {currentUser.name}
              </p>
              <p className="text-sm text-gray-600">Role: {currentUser.role}</p>
              <p className="text-sm text-gray-600">
                Username: {currentUser.username}
              </p>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Masuk ke Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={64}
              height={64}
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            MALL PELAYANAN PUBLIK
          </CardTitle>
          <CardDescription>
            Sistem Manajemen Pelayanan Perizinan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <Button
              onClick={handleResetData}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Reset Data Default
            </Button>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium mb-2">Demo Accounts:</p>
              <div className="space-y-1">
                <p>
                  <strong>Admin:</strong> username: <code>admin</code>,
                  password: <code>admin123</code>
                </p>
                <p>
                  <strong>User:</strong> username: <code>user1</code>, password:{" "}
                  <code>password</code>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

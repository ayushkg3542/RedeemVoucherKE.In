<?php
// Simple standalone dashboard shell for now.
// Later we can hook this into auth/session and real data.
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redeem Voucher – Admin Dashboard</title>

    <!-- Bootstrap 5 (layout + grid) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <!-- Font Awesome (icons) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-S+o0jWQvYx0P+GfVjFVnoB3F+uIBq9hk+U1RYgLIwV8QGvHeVy7wmGv5K8BPVKxH/efx44Ll5H+DjWl5BsC2bQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Dashboard specific styles -->
    <link rel="stylesheet" href="./assets/css/dashboard.css">
</head>

<body class="dashboard-body">
    <div class="dashboard-wrapper d-flex">
        <!-- Sidebar -->
        <aside class="dashboard-sidebar">
            <div class="sidebar-brand">
                <i class="fa-solid fa-gem sidebar-brand-icon"></i>
                <span class="sidebar-brand-text">Karma Admin</span>
            </div>
            <nav class="sidebar-nav">
                <a href="#" class="sidebar-link active">
                    <i class="fa-solid fa-gauge"></i>
                    <span>Dashboard</span>
                </a>
                <a href="#" class="sidebar-link">
                    <i class="fa-solid fa-envelope-open-text"></i>
                    <span>Enquiries</span>
                </a>
                <a href="#" class="sidebar-link">
                    <i class="fa-solid fa-hotel"></i>
                    <span>Resorts</span>
                </a>
                <a href="#" class="sidebar-link">
                    <i class="fa-solid fa-earth-asia"></i>
                    <span>Destinations</span>
                </a>
                <a href="#" class="sidebar-link">
                    <i class="fa-solid fa-users"></i>
                    <span>Guests</span>
                </a>
                <div class="sidebar-divider"></div>
                <a href="#" class="sidebar-link">
                    <i class="fa-solid fa-gear"></i>
                    <span>Settings</span>
                </a>
            </nav>
        </aside>

        <!-- Main content area -->
        <div class="dashboard-main flex-grow-1 d-flex flex-column">
            <!-- Top navbar -->
            <header class="dashboard-topbar d-flex align-items-center justify-content-between">
                <div class="topbar-left d-flex align-items-center gap-3">
                    <button class="btn btn-link p-0 d-lg-none text-muted" id="sidebarToggle">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <h1 class="h5 mb-0">Dashboard Overview</h1>
                </div>
                <div class="topbar-right d-flex align-items-center gap-3">
                    <div class="topbar-search d-none d-md-flex align-items-center">
                        <i class="fa-solid fa-magnifying-glass me-2 text-muted"></i>
                        <input type="text" class="form-control form-control-sm border-0 bg-transparent"
                            placeholder="Search…">
                    </div>
                    <button class="btn btn-link position-relative text-muted">
                        <i class="fa-regular fa-bell"></i>
                        <span class="badge bg-danger rounded-pill position-absolute translate-middle p-1"
                            style="top: 0; right: 0;"></span>
                    </button>
                    <div class="dropdown">
                        <button class="btn btn-outline-light d-flex align-items-center gap-2 dropdown-toggle"
                            type="button" id="userMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="avatar-circle">KE</span>
                            <span class="user-name d-none d-sm-inline">Admin</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuDropdown">
                            <li><a class="dropdown-item" href="#"><i class="fa-regular fa-user me-2"></i>Profile</a>
                            </li>
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-gear me-2"></i>Settings</a>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <!-- Main dashboard content -->
            <main class="dashboard-content flex-grow-1">
                <div class="container-fluid">
                    <div class="row g-4">
                        <div class="col-md-3">
                            <div class="dashboard-card">
                                <div class="card-label">Total Enquiries</div>
                                <div class="card-value">0</div>
                                <div class="card-subtext text-muted">Last 24 hours</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="dashboard-card">
                                <div class="card-label">Confirmed Bookings</div>
                                <div class="card-value">0</div>
                                <div class="card-subtext text-muted">This week</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="dashboard-card">
                                <div class="card-label">Active Resorts</div>
                                <div class="card-value">0</div>
                                <div class="card-subtext text-muted">Configured</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="dashboard-card">
                                <div class="card-label">Pending Follow-ups</div>
                                <div class="card-value">0</div>
                                <div class="card-subtext text-muted">Requires attention</div>
                            </div>
                        </div>
                    </div>

                    <div class="row g-4 mt-2">
                        <div class="col-lg-8">
                            <div class="dashboard-panel">
                                <div class="panel-header d-flex justify-content-between align-items-center">
                                    <h2 class="h6 mb-0">Recent Enquiries</h2>
                                    <a href="#" class="small text-muted text-decoration-none">View all</a>
                                </div>
                                <div class="panel-body placeholder-panel">
                                    <p class="mb-0 text-muted">
                                        No data yet. Once enquiries start coming in, a summarized list will appear here.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="dashboard-panel">
                                <div class="panel-header d-flex justify-content-between align-items-center">
                                    <h2 class="h6 mb-0">System Status</h2>
                                </div>
                                <div class="panel-body placeholder-panel">
                                    <ul class="list-unstyled mb-0 small">
                                        <li><i class="fa-solid fa-circle-check text-success me-2"></i>API status:
                                            Online</li>
                                        <li><i class="fa-solid fa-circle-check text-success me-2"></i>Database:
                                            Connected</li>
                                        <li><i class="fa-solid fa-circle-check text-success me-2"></i>Mail service:
                                            Ready</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Bootstrap Bundle (JS + Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="./assets/js/dashboard.js"></script>
</body>

</html>


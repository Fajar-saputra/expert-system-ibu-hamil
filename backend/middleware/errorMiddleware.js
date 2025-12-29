// Fungsi untuk menangani 404 Not Found
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Fungsi untuk menangani error umum
export const errorHandler = (err, req, res, next) => {
    // Pastikan status adalah 500 jika tidak disetel
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    let message = err.message;
    let stack = process.env.NODE_ENV === "production" ? null : err.stack;

    // Penanganan Mongoose Validation Error (jika perlu detail lebih lanjut)
    if (err.name === "ValidationError") {
        statusCode = 400; // Ubah status menjadi 400 Bad Request
        message = "Gagal Validasi Data";
    }

    res.json({
        message: message,
        stack: stack,
    });
};

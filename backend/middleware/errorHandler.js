export default function errorHandler(err, req, res, next) {
    console.error("Error occurred:", err.stack);
    console.log("Error handled by errorHandler middleware");

    res.status(500).json({ message: 'Internal Server Error' });
}
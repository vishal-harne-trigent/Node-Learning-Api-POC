import app from "./app";
import logError from "./common/logger/log-error.util";
import logger from "./common/logger/logger";
import sequelize from "./db/postgres/sequelize";

const PORT = 3003;

async function startServer() {
    try {
        await sequelize.authenticate();

        logger.info("Database connection successful.");

        await sequelize.sync({ alter: true });

        logger.info("Database synchronized.");

        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logError(
            "Unable to start application",
            { message: error instanceof Error ? error.message : "Unknown error" },
            error instanceof Error ? error : undefined
        );
    }
}

startServer();

class PrismaUtils {
    static async connect(client) {
        client.$connect();
    }

    static async disconnect(client) {
        client.$disconnect();
    }
}

export default PrismaUtils;
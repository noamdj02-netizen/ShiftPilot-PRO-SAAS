/* eslint-disable no-console */
/**
 * Script de test de connexion à Supabase
 * Usage: npx tsx test-db-connection.ts
 */

import { PrismaClient } from "@prisma/client"

async function testConnection() {
  console.log("🔍 Test de connexion à Supabase...\n")

  // Vérifier les variables d'environnement
  console.log("📋 Variables d'environnement:")
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? "✅ Définie" : "❌ Non définie"}`)
  console.log(`DIRECT_URL: ${process.env.DIRECT_URL ? "✅ Définie" : "❌ Non définie"}\n`)

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL n'est pas définie dans .env.local")
    process.exit(1)
  }

  const prisma = new PrismaClient({
    log: ["error", "warn"],
  })

  try {
    console.log("🔄 Tentative de connexion...")
    await prisma.$connect()
    console.log("✅ Connexion réussie!\n")

    // Test simple query
    console.log("🔄 Test de requête...")
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log("✅ Requête réussie:", result)
    
    await prisma.$disconnect()
    console.log("\n✅ Tous les tests sont passés!")
    process.exit(0)
  } catch (error: unknown) {
    console.error("\n❌ Erreur de connexion:")
    const message = error instanceof Error ? error.message : String(error)
    console.error(message)

    if (message.includes("Can't reach database server")) {
      console.log("\n💡 Suggestions:")
      console.log("1. Vérifiez que votre projet Supabase est actif")
      console.log("2. Vérifiez le mot de passe dans Supabase Dashboard")
      console.log("3. Vérifiez les restrictions réseau dans Supabase Settings")
      console.log("4. Essayez d'utiliser le connection pooler (port 6543)")
    }

    await prisma.$disconnect().catch(() => {})
    process.exit(1)
  }
}

void testConnection();


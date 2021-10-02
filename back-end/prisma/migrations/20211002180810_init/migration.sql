-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateOn" DATETIME NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'menber'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

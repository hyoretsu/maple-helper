/*
  Warnings:

  - You are about to drop the `_PartyToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelId` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PartyToUser" DROP CONSTRAINT "_PartyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PartyToUser" DROP CONSTRAINT "_PartyToUser_B_fkey";

-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "channelId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PartyToUser";

-- CreateTable
CREATE TABLE "BattleAnalysis" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "link" TEXT,
    "characterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BattleAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "level" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToParty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_nickname_key" ON "Character"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToParty_AB_unique" ON "_CharacterToParty"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToParty_B_index" ON "_CharacterToParty"("B");

-- AddForeignKey
ALTER TABLE "BattleAnalysis" ADD CONSTRAINT "BattleAnalysis_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToParty" ADD CONSTRAINT "_CharacterToParty_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToParty" ADD CONSTRAINT "_CharacterToParty_B_fkey" FOREIGN KEY ("B") REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;

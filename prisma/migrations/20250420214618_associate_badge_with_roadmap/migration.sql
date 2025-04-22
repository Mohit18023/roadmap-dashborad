/*
  Warnings:

  - You are about to drop the column `description` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `roadmapId` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Badge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[badgeId]` on the table `Roadmap` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_roadmapId_fkey";

-- DropIndex
DROP INDEX "Badge_title_idx";

-- DropIndex
DROP INDEX "Badge_title_key";

-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "description",
DROP COLUMN "roadmapId",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "badgeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Roadmap_badgeId_key" ON "Roadmap"("badgeId");

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

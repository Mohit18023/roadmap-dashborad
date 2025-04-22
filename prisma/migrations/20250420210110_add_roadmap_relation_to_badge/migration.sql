/*
  Warnings:

  - Added the required column `roadmapId` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Roadmap_title_idx";

-- DropIndex
DROP INDEX "Roadmap_title_key";

-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "roadmapId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

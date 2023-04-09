-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "sharings" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

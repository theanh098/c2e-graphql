-- AlterEnum
ALTER TYPE "MainCategories" ADD VALUE 'lightning network';

-- CreateTable
CREATE TABLE "feedbacks_on_businesses" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "business_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "text" VARCHAR NOT NULL,
    "urls" VARCHAR[],
    "likes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "dislikes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "feedbacks_on_businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replies_on_feedbacks" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedback_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "replies_on_feedbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedbacks_on_businesses" ADD CONSTRAINT "feedbacks_on_businesses_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks_on_businesses" ADD CONSTRAINT "feedbacks_on_businesses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies_on_feedbacks" ADD CONSTRAINT "replies_on_feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies_on_feedbacks" ADD CONSTRAINT "replies_on_feedbacks_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedbacks_on_businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

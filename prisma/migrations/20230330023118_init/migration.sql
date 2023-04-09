-- CreateEnum
CREATE TYPE "MediaSoucres" AS ENUM ('Photo', 'Telegram', 'Discord', 'Twitter', 'Blog');

-- CreateEnum
CREATE TYPE "Notificationtypes" AS ENUM ('like', 'dislike', 'reply', 'tagged', 'review_rejected', 'review_approved');

-- CreateEnum
CREATE TYPE "ReviewStatuses" AS ENUM ('approved', 'pending', 'rejected');

-- CreateEnum
CREATE TYPE "MainCategories" AS ENUM ('currencies', 'exchange', 'cryptocurrencies', 'nft', 'metaverse', 'ai', 'others');

-- CreateEnum
CREATE TYPE "SuperUserRoles" AS ENUM ('admin', 'editor');

-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('approved', 'pending', 'rejected');

-- CreateTable
CREATE TABLE "businesses" (
    "id" SERIAL NOT NULL,
    "main_category" "MainCategories" NOT NULL DEFAULT 'currencies',
    "status" "BusinessStatus" NOT NULL DEFAULT 'pending',
    "type" VARCHAR[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "overview" VARCHAR NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "token" VARCHAR,
    "cmc_id" INTEGER,
    "logo" VARCHAR,
    "founder_name" VARCHAR,
    "start_date" TIMESTAMP(6),
    "address" VARCHAR,
    "whitepaper_url" VARCHAR,
    "contract_address" VARCHAR,
    "website" VARCHAR,
    "chains" VARCHAR[],

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" SERIAL NOT NULL,
    "source" "MediaSoucres" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR NOT NULL,
    "business_id" INTEGER NOT NULL,
    "path" TEXT,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wallet_address" VARCHAR NOT NULL,
    "noti_accepted" BOOLEAN NOT NULL DEFAULT true,
    "spam_accepted" BOOLEAN NOT NULL DEFAULT true,
    "email" VARCHAR,
    "nickname" VARCHAR,
    "avatar_url" VARCHAR,
    "refresh_token" VARCHAR,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "password" VARCHAR,
    "last_edited_date" TIMESTAMP(6),
    "role" VARCHAR,
    "background_url" VARCHAR,
    "address" VARCHAR,
    "bio" VARCHAR,
    "website" VARCHAR,
    "facebook" VARCHAR,
    "twitter" VARCHAR,
    "google" VARCHAR,
    "linkedin" VARCHAR,
    "telegram" VARCHAR,
    "discord" VARCHAR,
    "didId" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followers_on_businesses" (
    "follower_id" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "followers_on_businesses_pkey" PRIMARY KEY ("follower_id","business_id")
);

-- CreateTable
CREATE TABLE "emails" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR NOT NULL,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "type" "Notificationtypes" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "business_id" INTEGER NOT NULL,
    "review_id" INTEGER NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "to" INTEGER NOT NULL,
    "from" INTEGER,
    "meta_data" VARCHAR,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "status" "ReviewStatuses" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rate" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "likes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "dislikes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "headline" VARCHAR,
    "comment" VARCHAR,
    "txn_hash" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_histories" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rate" INTEGER NOT NULL,
    "review_id" INTEGER NOT NULL,
    "txn_hash" TEXT NOT NULL,
    "headline" VARCHAR,
    "comment" VARCHAR,

    CONSTRAINT "review_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replies" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "desc" VARCHAR NOT NULL,
    "review_id" INTEGER NOT NULL,
    "likes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "dislikes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "super_users" (
    "id" SERIAL NOT NULL,
    "role" "SuperUserRoles" NOT NULL,
    "refresh_token" VARCHAR,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "avatar" VARCHAR,

    CONSTRAINT "super_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rates_on_businesses" (
    "valuer_id" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "rates_on_businesses_pkey" PRIMARY KEY ("valuer_id","business_id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "metadata" VARCHAR,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_on_campaigns" (
    "user_id" INTEGER NOT NULL,
    "campaign_id" INTEGER NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL,
    "txnHash" VARCHAR,

    CONSTRAINT "users_on_campaigns_pkey" PRIMARY KEY ("user_id","campaign_id")
);

-- CreateTable
CREATE TABLE "dids" (
    "id" INTEGER NOT NULL,
    "doc" JSONB NOT NULL,
    "txn_hash" VARCHAR NOT NULL,

    CONSTRAINT "dids_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "businesses_name_key" ON "businesses"("name");

-- CreateIndex
CREATE INDEX "businesses_type_idx" ON "businesses"("type");

-- CreateIndex
CREATE INDEX "businesses_main_category_idx" ON "businesses"("main_category");

-- CreateIndex
CREATE INDEX "businesses_main_category_type_idx" ON "businesses"("main_category", "type");

-- CreateIndex
CREATE INDEX "businesses_cmc_id_idx" ON "businesses"("cmc_id");

-- CreateIndex
CREATE INDEX "businesses_token_idx" ON "businesses"("token");

-- CreateIndex
CREATE INDEX "businesses_cmc_id_token_idx" ON "businesses"("cmc_id", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_address_key" ON "users"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "emails_email_key" ON "emails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_txn_hash_key" ON "reviews"("txn_hash");

-- CreateIndex
CREATE UNIQUE INDEX "review_histories_txn_hash_key" ON "review_histories"("txn_hash");

-- CreateIndex
CREATE UNIQUE INDEX "super_users_username_key" ON "super_users"("username");

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "super_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_didId_fkey" FOREIGN KEY ("didId") REFERENCES "dids"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers_on_businesses" ADD CONSTRAINT "followers_on_businesses_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers_on_businesses" ADD CONSTRAINT "followers_on_businesses_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_to_fkey" FOREIGN KEY ("to") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_from_fkey" FOREIGN KEY ("from") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_histories" ADD CONSTRAINT "review_histories_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rates_on_businesses" ADD CONSTRAINT "rates_on_businesses_valuer_id_fkey" FOREIGN KEY ("valuer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rates_on_businesses" ADD CONSTRAINT "rates_on_businesses_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_campaigns" ADD CONSTRAINT "users_on_campaigns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_campaigns" ADD CONSTRAINT "users_on_campaigns_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

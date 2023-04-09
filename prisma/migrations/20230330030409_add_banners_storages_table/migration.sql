-- CreateTable
CREATE TABLE "storages" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR NOT NULL,
    "tag" VARCHAR,

    CONSTRAINT "storages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expried_time" TIMESTAMP(6) NOT NULL,
    "source_id" INTEGER NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "storages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

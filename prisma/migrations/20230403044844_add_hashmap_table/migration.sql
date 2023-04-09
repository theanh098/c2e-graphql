-- CreateTable
CREATE TABLE "hash_maps" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR NOT NULL,
    "value" VARCHAR[],

    CONSTRAINT "hash_maps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hash_maps_key_key" ON "hash_maps"("key");

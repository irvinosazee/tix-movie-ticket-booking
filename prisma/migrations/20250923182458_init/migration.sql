-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "posterUrl" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "imdbRating" REAL,
    "releaseYear" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "theaters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "showtimes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "theaterId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "showtimes_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "showtimes_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "theaters" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "showtimeId" TEXT NOT NULL,
    "row" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "seats_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "showtimes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "showtimeId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "totalAmount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "bookings_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "showtimes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BookingSeats" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookingSeats_A_fkey" FOREIGN KEY ("A") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookingSeats_B_fkey" FOREIGN KEY ("B") REFERENCES "seats" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "theaters_name_key" ON "theaters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "seats_showtimeId_row_number_key" ON "seats"("showtimeId", "row", "number");

-- CreateIndex
CREATE UNIQUE INDEX "_BookingSeats_AB_unique" ON "_BookingSeats"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingSeats_B_index" ON "_BookingSeats"("B");

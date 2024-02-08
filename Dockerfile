# Gunakan image Node.js versi 18.11.0 sebagai base image untuk tahap build
FROM node:18.11.0 AS builder

# Set direktori kerja di dalam container untuk tahap build
WORKDIR /app

# Salin berkas 'package.json' dan 'package-lock.json' (jika ada)
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin seluruh kode sumber ke dalam direktori kerja di container
COPY . .

# Kompilasi TypeScript ke JavaScript
RUN npm run tsc

# Tahap kedua: Siapkan image produksi dengan Node.js versi 18.11.0
FROM node:18.11.0 AS production

# Set direktori kerja di dalam container untuk tahap produksi
WORKDIR /app

# Salin berkas 'package.json' dan 'package-lock.json' (jika ada)
COPY package*.json ./

# Instal hanya dependensi produksi
RUN npm install --only=production

# Salin hasil build dari tahap builder
COPY --from=builder /app/build ./build

# Expose port yang aplikasi gunakan
EXPOSE 3000

# Tentukan perintah untuk menjalankan aplikasi
CMD ["node", "build/index.js"]

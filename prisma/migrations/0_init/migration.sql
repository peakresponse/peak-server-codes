-- CreateTable
CREATE TABLE "icd10_cm_chapters" (
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "desc" TEXT,

    CONSTRAINT "icd10_cm_chapters_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "icd10_cm_sections" (
    "id" TEXT NOT NULL,
    "desc" TEXT,
    "chapter_name" TEXT NOT NULL,

    CONSTRAINT "icd10_cm_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "icd10_cm_codes" (
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "section_id" TEXT NOT NULL,
    "parent_name" TEXT,
    "depth" INTEGER NOT NULL,
    "lft" INTEGER NOT NULL,
    "rgt" INTEGER,

    CONSTRAINT "icd10_cm_codes_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "icd10_cm_sections" ADD CONSTRAINT "icd10_cm_sections_chapter_name_fkey" FOREIGN KEY ("chapter_name") REFERENCES "icd10_cm_chapters"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "icd10_cm_codes" ADD CONSTRAINT "icd10_cm_codes_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "icd10_cm_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "icd10_cm_codes" ADD CONSTRAINT "icd10_cm_codes_parent_name_fkey" FOREIGN KEY ("parent_name") REFERENCES "icd10_cm_codes"("name") ON DELETE SET NULL ON UPDATE CASCADE;


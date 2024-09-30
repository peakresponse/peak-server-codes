-- CreateTable
CREATE TABLE "ICD10CMChapter" (
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "desc" TEXT,

    CONSTRAINT "ICD10CMChapter_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ICD10CMSection" (
    "id" TEXT NOT NULL,
    "desc" TEXT,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "ICD10CMSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ICD10CMCode" (
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "sectionId" TEXT NOT NULL,
    "parentId" TEXT,
    "depth" INTEGER NOT NULL,
    "lft" INTEGER NOT NULL,
    "rgt" INTEGER,

    CONSTRAINT "ICD10CMCode_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "ICD10CMSection" ADD CONSTRAINT "ICD10CMSection_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "ICD10CMChapter"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ICD10CMCode" ADD CONSTRAINT "ICD10CMCode_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ICD10CMSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ICD10CMCode" ADD CONSTRAINT "ICD10CMCode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ICD10CMCode"("name") ON DELETE SET NULL ON UPDATE CASCADE;


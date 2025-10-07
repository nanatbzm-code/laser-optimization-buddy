import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Database, Search } from "lucide-react";
import { materialsDatabase } from "@/data/materialsDatabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MaterialsDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMaterials = materialsDatabase.filter(
    (material) =>
      material.material.includes(searchTerm) ||
      material.process.includes(searchTerm) ||
      material.laserType.includes(searchTerm)
  );

  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader className="bg-gradient-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-xl">پایگاه داده مواد</CardTitle>
              <CardDescription className="mt-1">
                اطلاعات {materialsDatabase.length} ماده و پارامترهای مرتبط
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="جستجو در پایگاه داده..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 bg-background"
            />
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-secondary z-10">
                <TableRow>
                  <TableHead className="text-right font-bold">فرآیند</TableHead>
                  <TableHead className="text-right font-bold">دسته</TableHead>
                  <TableHead className="text-right font-bold">ماده</TableHead>
                  <TableHead className="text-right font-bold">ضخامت (mm)</TableHead>
                  <TableHead className="text-right font-bold">لیزر</TableHead>
                  <TableHead className="text-right font-bold">توان (W)</TableHead>
                  <TableHead className="text-right font-bold">زمان پالس</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material, index) => (
                  <TableRow key={index} className="hover:bg-secondary/50">
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {material.process}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={material.category === "فلزی" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {material.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{material.material}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {material.thicknessMin}-{material.thicknessMax}
                    </TableCell>
                    <TableCell className="text-xs">{material.laserType}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {material.powerMin}-{material.powerMax}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {material.pulseTime}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            موردی یافت نشد. لطفاً عبارت جستجوی دیگری امتحان کنید.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialsDatabase;

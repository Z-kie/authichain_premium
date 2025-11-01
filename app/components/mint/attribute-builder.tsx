
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface Attribute {
  traitType: string;
  value: string;
}

interface AttributeBuilderProps {
  value: Attribute[];
  onChange: (attributes: Attribute[]) => void;
}

export function AttributeBuilder({ value, onChange }: AttributeBuilderProps) {
  const [newAttribute, setNewAttribute] = useState<Attribute>({
    traitType: "",
    value: "",
  });

  const handleAdd = () => {
    if (newAttribute.traitType && newAttribute.value) {
      onChange([...value, newAttribute]);
      setNewAttribute({ traitType: "", value: "" });
    }
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Existing Attributes */}
      {value.length > 0 && (
        <div className="grid gap-3">
          {value.map((attr, index) => (
            <Card key={index}>
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-muted-foreground">Trait Type</span>
                    <p className="font-medium">{attr.traitType}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Value</span>
                    <p className="font-medium">{attr.value}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Attribute */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Input
              placeholder="Trait Type (e.g., Background)"
              value={newAttribute.traitType}
              onChange={(e) =>
                setNewAttribute({ ...newAttribute, traitType: e.target.value })
              }
            />
            <Input
              placeholder="Value (e.g., Blue)"
              value={newAttribute.value}
              onChange={(e) =>
                setNewAttribute({ ...newAttribute, value: e.target.value })
              }
            />
            <Button
              type="button"
              onClick={handleAdd}
              disabled={!newAttribute.traitType || !newAttribute.value}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

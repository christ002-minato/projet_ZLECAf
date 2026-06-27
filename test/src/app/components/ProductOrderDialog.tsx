import { Product } from "../data/products";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { ProductOrderPanel } from "./ProductOrderPanel";

interface ProductOrderDialogProps {
  product: Product | null;
  countryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductOrderDialog({ product, countryId, open, onOpenChange }: ProductOrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="hidden md:block max-w-6xl max-h-[92vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Commande produit</DialogTitle>
        {product && (
          <ProductOrderPanel product={product} countryId={countryId} onClose={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}

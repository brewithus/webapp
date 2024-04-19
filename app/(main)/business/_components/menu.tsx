import ProductCard from './menu-item';

import { cn } from '@/lib/utils';
import { rubikFont } from '@/styles/fonts';
import { MenuItem } from '../_types';

interface Props {
  items: MenuItem[];
}

const ProductList: React.FC<Props> = ({ items }) => {
  return (
    <div className="flex flex-col gap-2">
      <p
        className={cn(
          'text-3xl font-bold text-center p-4 w-full border-b',
          rubikFont.className,
        )}
      >
        Menu
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4">
        {items.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;

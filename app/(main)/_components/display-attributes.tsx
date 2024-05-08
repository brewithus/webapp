import { cn } from '@/lib/utils';
import { type Attributes } from '@/types/yelp';
import {
  type LucideIcon,
  Bike,
  Car,
  PackageCheck,
  ParkingCircle,
  PawPrint,
  Soup,
  Trees,
  Utensils,
  Wifi,
  type LucideProps,
  Check,
  X,
  Volume2,
  ParkingMeter,
} from 'lucide-react';
import React from 'react';

interface DisplayAttributesProps {
  attributes: Attributes;
}

const DisplayAttributes: React.FC<DisplayAttributesProps> = ({
  attributes,
}) => {
  const attributesRecord = attributesToRecordMap(attributes);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {attributesRecord.map(([name, value]) => (
        <DisplayAttribute key={name} name={name} value={value} />
      ))}
    </div>
  );
};

export default DisplayAttributes;

interface AttributeProps {
  name: string;
  value: boolean | null | string;
}

const DisplayAttribute: React.FC<AttributeProps> = ({ name, value }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        (value == null || !value) && 'text-foreground/50',
      )}
    >
      {value == null || !value ? <X /> : <AttributeIcon name={name} />}
      <span className={cn('capitalize')}>
        {name.split('_').join(' ').replace('business', '').trim()}
        {typeof value === 'string' && `: ${value}`}
      </span>
    </div>
  );
};

const AttributeIcon = ({
  name,
  ...props
}: { name: string } & LucideProps): JSX.Element => {
  const IconComponent = attributesMapping[name];
  return IconComponent ? <IconComponent {...props} /> : <Check {...props} />;
};

const attributesMapping: Record<string, LucideIcon> = {
  bike_parking: Bike,
  parking_lot: ParkingCircle,
  street_parking: ParkingMeter,
  caters: Utensils,
  dogs_allowed: PawPrint,
  drive_thru: Car,
  noise_level: Volume2,
  restaurants_delivery: PackageCheck,
  restaurants_take_out: Soup,
  wi_fi: Wifi,
  outdoor_seating: Trees,
};

const attributesToRecordMap = (
  attributes: Attributes,
): Array<[string, string | boolean | null]> => {
  const result: Array<[string, string | boolean | null]> = [];

  // Iterate over the properties of the Attributes interface
  for (const key in attributes) {
    // Handle special cases for specific properties
    switch (key) {
      case 'business_parking': {
        const parking = attributes.business_parking;
        if (parking) {
          // Check if parking is not null or undefined
          const { valet, garage, street, lot, validated } = parking;
          if (valet) {
            result.push(['valet_parking', valet]);
          }
          if (garage) {
            result.push(['garage_parking', garage]);
          }
          if (street) {
            result.push(['street_parking', street]);
          }
          if (lot) {
            result.push(['parking_lot', lot]);
          }
          if (validated) {
            result.push(['validated_parking', validated]);
          }
        }
        break;
      }
      case 'menu_url':
      case 'business_url':
      case 'business_temp_closed':
        break;
      default:
        if (!/^about_this_biz/.test(key)) {
          result.push([
            key,
            attributes[key as keyof Attributes] as string | boolean | null,
          ]);
        }
        break;
    }
  }

  // Sort the result array based on the specified rules
  result.sort((a, b) => {
    const [keyA, valueA] = a;
    const [keyB, valueB] = b;

    // Check if both values are truthy
    const isValueATruthy = !!valueA;
    const isValueBTruthy = !!valueB;

    // Sort truthy values first
    if (isValueATruthy && !isValueBTruthy) {
      return -1;
    } else if (!isValueATruthy && isValueBTruthy) {
      return 1;
    }

    // If both values are truthy or falsy, sort alphabetically
    if (keyA < keyB) {
      return -1;
    } else if (keyA > keyB) {
      return 1;
    }

    // If keys are the same, maintain original order
    return 0;
  });

  return result;
};

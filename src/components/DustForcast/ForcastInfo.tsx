import { Text, Stack, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getDustForcast } from '@/apis/dustForecast';
import ForcastImages from './ForcastImages';

interface ForcastInfoProps {
  cityName: string;
}

const ForcastInfo = ({ cityName }: ForcastInfoProps) => {
  const { data: dustForcast } = useQuery(
    ['dust-forcast', cityName],
    getDustForcast,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  return (
    <>
      {dustForcast ? (
        <>
          <Text
            fontSize={16}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.4}
          >
            {dustForcast.informOverall}
          </Text>
          <Text
            fontSize={16}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.4}
          >
            {dustForcast.informCause}
          </Text>
        </>
      ) : (
        <Stack>
          {[...Array(5).keys()].map((i) => (
            <Skeleton key={i} height={4} endColor="#dfdfdf" />
          ))}
        </Stack>
      )}
      {dustForcast ? (
        <ForcastImages dustForcast={dustForcast} />
      ) : (
        <Skeleton height={800} mt={8} endColor="#dfdfdf" />
      )}
    </>
  );
};

export default ForcastInfo;

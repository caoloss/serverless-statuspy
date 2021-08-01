import { Heading, Button, HStack, VStack, Box, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "@emotion/react";

import { ServiceModal } from "./ServiceModal";
import { Resource } from "./Resource";
import { Status } from "./Status";
import { UpdatedAt } from "./UpdatedAt";

export const Services = () => {
    const theme = useTheme()


    const [selectedService, setSelectedService] = useState(null);
    const [filterServices, setFilterServices] = useState(null);

    console.log('filterServices',filterServices)
    return (
        <Box>
            <Box>
                <HStack spacing="24px" justifyContent="space-between">
                    <Heading>Services</Heading>
                    <HStack >
                    <Select
                        placeholder="Filter"
                        value={filterServices}
                        onChange={(e) => setFilterServices(e.target.value)}
                    >
                        <option value="Operational">Operational</option>
                        <option value="Degraded Performance">Degraded Performance</option>
                        <option value="Partial Outage">Partial Outage</option>
                        <option value="Major Outage">Major Outage</option>
                    </Select>
                    <Button size="sm" onClick={() => setSelectedService({})} colorScheme="blue">
                        New Service
                    </Button>
                        </HStack>
                </HStack>

                <Resource

                    path={`services${filterServices ? `?serviceStatus=${filterServices}` : ``}`}
                    render={(props) => (
                        <VStack alignItems="flex-start" mt={25} spacing="24px">
                            <ServiceModal

                                selectedService={selectedService}
                                setSelectedService={setSelectedService}
                                addService={props.addResource}
                                deleteService={props.deleteResource}
                                loadingAdd={props.loadingAdd}
                                loadingDelete={props.loadingDelete}
                            />
                            {props.data &&
                                props.data.services &&
                                props.data.services
                                    .sort((a, b) => b.serviceCreatedAt - a.serviceCreatedAt)
                                    .map((service) => (
                                        <Box
                                            cursor="pointer"
                                            onClick={() => setSelectedService(service)}
                                            key={service.serviceId}
                                            spacing={8}
                                            width="100%"
                                            p={5}
                                            shadow="md"
                                            borderWidth="1px"
                                            borderRadius="md"
                                            flex="1"
                                            css={{
                                                transition: 'all .3s ease-in-out',
                                                '&:hover': {
                                                    backgroundColor: theme.colors.gray[700]
                                                }
                                            }}
                                        >
                                            <VStack alignItems="flex-stretch">

                                                <HStack justifyContent="space-between">
                                                    <Heading as="h2" size="md">
                                                        {service.serviceName}
                                                    </Heading>
                                                    <HStack>
                                                        <Status status={service.serviceStatus} />
                                                    </HStack>
                                                </HStack>
                                                <HStack justifyContent="space-between">
                                                    <Heading as="h5" size="sm" fontWeight="normal" color="grey">
                                                        {service.serviceDescription}
                                                    </Heading>
                                                    <UpdatedAt updatedAt={service.serviceUpdatedAt} createdAt={service.serviceCreatedAt} />
                                                </HStack>
                                            </VStack>
                                        </Box>
                                    ))}
                        </VStack>
                    )}
                />
            </Box>
        </Box>
    );
};

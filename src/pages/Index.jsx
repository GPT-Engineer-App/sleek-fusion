import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { FaLock, FaRocket, FaUser } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCustomer, setIsCustomer] = useState(true);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-4cvy.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const { error } = await response.json();
        toast({
          title: "Login Failed",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center" bg={bgColor} color={color}>
      {isLoggedIn ? (
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={8}>
            {isCustomer ? (
              <>
                Welcome to the Future <FaRocket />
              </>
            ) : (
              <>
                SaaS Builder Dashboard <FaUser />
              </>
            )}
          </Heading>
          <Text fontSize="xl" mb={8}>
            {isCustomer ? "Explore our cutting-edge features and services." : "Build and manage your SaaS application."}
          </Text>
          <Button onClick={() => setIsCustomer(!isCustomer)}>Switch to {isCustomer ? "SaaS Builder" : "Customer"} View</Button>
        </Box>
      ) : (
        <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg={useColorModeValue("white", "gray.700")}>
          <Heading as="h1" size="xl" mb={8} textAlign="center">
            Login <FaLock />
          </Heading>
          <Input placeholder="Email" type="email" mb={4} value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" mb={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button colorScheme="blue" onClick={handleLogin} mb={4} width="100%">
            Login
          </Button>
          <Button onClick={toggleColorMode} width="100%">
            Toggle {useColorModeValue("Dark", "Light")} Mode
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Index;

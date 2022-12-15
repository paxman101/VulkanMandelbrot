cmake_minimum_required(VERSION 3.14)
project(VulkanMandelbrot)

set(CMAKE_CXX_STANDARD 17)

add_executable(VulkanMandelbrot main.cpp)

set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)

set(VK_LAYER_PATH, "/etc/vulkan/explicit_layer.d")
find_package(Vulkan REQUIRED)
target_link_libraries(VulkanMandelbrot Vulkan::Vulkan)

include_directories("/usr/include/GLFW" "/usr/include/glm")
target_link_libraries(VulkanMandelbrot glfw)

include_directories("/usr/include/stb")

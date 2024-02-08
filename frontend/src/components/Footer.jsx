export default function Footer() {
  return (
    <footer class="font-avant-garde w-full bg-white pb-3  shadow p-0 m-0 pt-20 dark:bg-black sticky top-[100vh]  ">
      <div class="w-full  md:flex md:items-center md:justify-between">
        <span class="text-sm text-white sm:text-center dark:text-white">
          © 2024{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Cinewars™
          </a>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-white sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

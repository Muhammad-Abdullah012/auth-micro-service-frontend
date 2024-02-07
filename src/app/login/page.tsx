import { Label } from "@/components/ui/label";
import { Input } from "./components/input";
import { Button } from "./components/button";

export default function Component() {
  return (
    <div className="space-y-4">
      <div>
        <Label
          className="text-gray-900 dark:text-gray-100"
          htmlFor="emailOrUsername"
        >
          Email or Username
        </Label>
        <Input
          className="w-full mt-1"
          id="emailOrUsername"
          placeholder="Enter your email"
          required
          type="text"
        />
      </div>
      <div>
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="password">
          Password
        </Label>
        <Input
          className="w-full mt-1"
          id="password"
          placeholder="Enter your password"
          required
          type="password"
        />
      </div>
      <Button
        className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Login
      </Button>
    </div>
  );
}

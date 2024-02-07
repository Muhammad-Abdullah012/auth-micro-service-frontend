import React from "react";

const UserProfileCard = () => {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-3xl"
      data-v0-t="card"
    >
      <div className="flex flex-col space-y-1.5 p-6 text-center">
        <div className="space-y-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full mx-auto w-24 h-24">
            <img
              src="/placeholder.svg"
              width="96"
              height="96"
              alt="Avatar image"
              className="rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
          </span>
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
              alice
            </h3>
            <p className="text-sm text-muted-foreground">
              Software engineer. Cat lover. Building the metaverse.
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 text-center">
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
          Follow
        </button>
      </div>
      <div className="flex items-center p-6 border-t justify-center">
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;

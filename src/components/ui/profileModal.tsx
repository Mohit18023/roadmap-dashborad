import { BadgeIcon } from './badgeIcon';
import { Dialog } from './dialog';
import { Progress } from './progress';

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  badges: Badge[];
  enrolledRoadmaps: RoadmapProgress[];
}

interface Badge {
  id: string;
  name: string;
  imageUrl: string;
}

interface RoadmapProgress {
  id: string;
  name: string;
  progress: number;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl mx-4 p-6 shadow-xl">
          {/* Top Container */}
          <div className="flex gap-6 mb-8">
            {/* User Photo - 1/4th of width */}
            <div className="w-1/4">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img
                  src={user.photoUrl || "/default.png"}
                  alt={user.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/default.png";
                  }}
                  className="w-full h-full rounded-full object-cover"
                />

              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  ID: {user.id}
                </p>
              </div>

              {/* Badges Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge) => (
                    <BadgeIcon key={badge.id} badge={badge} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Roadmaps Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Enrolled Roadmaps
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Name</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {user.enrolledRoadmaps.map((roadmap) => (
                    <tr
                      key={roadmap.id}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {roadmap.name}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Progress value={roadmap.progress} className="w-48" />
                          <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[3rem]">
                            {roadmap.progress}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

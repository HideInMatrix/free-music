import {motion} from "motion/react"

export const MusicAnimation = ({showAnimation}:{showAnimation:boolean}) => {
  return (
    <motion.div
      className="fixed bottom-20 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-lg mx-4 p-6 rounded-lg"
      initial={{ y: "100%", opacity: 0 }}
      animate={{
        y: showAnimation ? 0 : "100%",
        opacity: showAnimation ? 1 : 0
      }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
    >
      {/* 这里可以添加动画内容 */}
      <div className="text-center text-gray-700">
        <h3 className="text-xl font-bold mb-4">正在播放</h3>
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <motion.div
            className="bg-blue-500 h-1 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
};
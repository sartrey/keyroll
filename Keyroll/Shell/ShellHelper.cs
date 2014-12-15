using System.Diagnostics;

namespace Keyroll.Shell
{
    public class ShellHelper
    {
        public Process Open(string path) 
        {
            var process = new Process();
            process.StartInfo.UseShellExecute = true;
            process.StartInfo.FileName = path;
            process.EnableRaisingEvents = true;
            process.Start();
            return process;
        }
    }
}

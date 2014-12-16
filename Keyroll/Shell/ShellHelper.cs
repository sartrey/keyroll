using System.Diagnostics;
using System.Web;

namespace Keyroll.Shell
{
    public class ShellHelper
    {
        public static string GetMIME(string path)
        {
            return MimeMapping.GetMimeMapping(path);
        }

        public static Process ShellOpen(string path) 
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

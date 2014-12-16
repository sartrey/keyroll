using System.IO;

namespace Keyroll.Shell
{
    public interface IShellProvider
    {
        bool Support(string mime);

        object Shell(Stream stream);
    }
}

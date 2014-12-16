using Keyroll.KVM;
using Keyroll.TDS;
using Sartrey.UI.WinForms;
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class MainUI : Sartrey.UI.WinForms.View
    {
        public MainUI()
        {
            InitializeComponent();
            Text = "Keyroll";
        }

        protected override void OnViewClosing(FormClosingEventArgs e)
        {
            if (e.CloseReason != CloseReason.ApplicationExitCall)
            {
                e.Cancel = true;
                Application.Exit();
            }
            base.OnViewClosing(e);
        }

        public void RefreshData() 
        {
            var storage = Runtime.Instance.Storage;
            LsvAssets.Items.Clear();
            foreach (var asset in storage.Assets)
            {
                var lvi = new ListViewItem(
                    new string[] { asset.Name, asset.Type });
                lvi.Tag = asset.Id;
                LsvAssets.Items.Add(lvi);
            }
        }

        private void BtnCreateStorage_Click(object sender, EventArgs e)
        {
            var dlg = new SaveFileDialog();
            dlg.Filter = "TDS存储|*.tds";
            var result = dlg.ShowDialog();
            if (result != DialogResult.OK)
                return;
            var key_ui = new KeyUI();
            var window = new Window(key_ui);
            window.ShowDialog();
            result = window.Result;
            if (result != DialogResult.OK)
                return;
            
            var storage = Storage.Create(dlg.FileName, key_ui.NewKey);
            storage.Commit();
            Runtime.Instance.Storage = storage;
        }

        private void BtnLoadStorage_Click(object sender, EventArgs e)
        {
            var dlg = new OpenFileDialog();
            dlg.Filter = "TDS存储|*.tds";
            var result = dlg.ShowDialog();
            if (result != DialogResult.OK)
                return;
            var key_ui = new KeyUI();
            var window = new Window(key_ui);
            window.ShowDialog();
            result = window.Result;
            if (result != DialogResult.OK)
                return;

            var storage = Storage.Load(dlg.FileName, key_ui.NewKey);
            if (storage == null)
            {
                MessageBox.Show("failed to load storage");
                return;
            }
            Runtime.Instance.Storage = storage;
            RefreshData();
        }

        private void BtnSaveStorage_Click(object sender, EventArgs e)
        {
            Runtime.Instance.Storage.Commit();
        }

        private void BtnAddAsset_Click(object sender, EventArgs e)
        {
            var selectfiles_ui = new SelectFilesUI();
            var window = new Window(selectfiles_ui);
            window.ShowDialog();
            var result = window.Result;
            if (result != DialogResult.OK)
                return;
            var files = selectfiles_ui.Files;
            var storage = Runtime.Instance.Storage;
            foreach (var file in files) 
            {
                var asset = Asset.FromFile(file);
                var assets = storage.GetAssetByName(asset.Hash);
                if (assets.Count() > 0)
                    continue;
                storage.AddAsset(asset);
                storage.AttachEntry(asset, file);
            }
            storage.Commit();
            RefreshData();
        }

        private void BtnAddKVM_Click(object sender, EventArgs e)
        {
            var asset = Asset.Create();
            asset.Name = "Memory";
            asset.Type = Memory.MIME;

            var storage = Runtime.Instance.Storage;
            storage.AddAsset(asset);

            var memory = new Memory();
            var stream = new MemoryStream(
                Encoding.UTF8.GetBytes(memory.ToXML().ToString()));
            storage.AttachEntry(asset, stream);
            storage.Commit();
            RefreshData();
        }

        private void BtnRemoveAsset_Click(object sender, EventArgs e)
        {
            var items = LsvAssets.SelectedItems;
            if (items.Count == 0)
                return;
            var storage = Runtime.Instance.Storage;
            foreach (ListViewItem lvi in items) 
            {
                var id = lvi.Tag as string;
                var asset = storage[id];
                storage.DetachEntry(asset);
                storage.RemoveAsset(asset);
            }
            storage.Commit();
            RefreshData();
        }

        private void BtnExportAsset_Click(object sender, EventArgs e)
        {
            var items = LsvAssets.SelectedItems;
            if (items.Count == 0)
                return;
            var dlg = new FolderBrowserDialog();
            var result = dlg.ShowDialog();
            if (result != DialogResult.OK)
                return;
            var storage = Runtime.Instance.Storage;
            foreach (ListViewItem lvi in items)
            {
                var id = lvi.Tag as string;
                var asset = storage[id];
                var path = Path.Combine(dlg.SelectedPath, asset.Name);
                storage.ExportEntry(asset, path, true);
            }
        }

        private void BtnShellAsset_Click(object sender, EventArgs e)
        {
            var items = LsvAssets.SelectedItems;
            if (items.Count != 1)
                return;
            var runtime = Runtime.Instance;
            var storage = runtime.Storage;
            var item = items[0];
            var id = item.Tag as string;
            var asset = storage[id];
            
            var router = runtime.ShellRouter;
            var providers = router.QueryProviders(asset.Type);
            if (providers.Count() == 0)
            {
                var path = Path.Combine(Application.StartupPath, "temp", asset.Name);
                storage.ExportEntry(asset, path, true);
                var process = Shell.ShellHelper.ShellOpen(path);
            }
            else 
            {

            }
        }
    }
}
